'use client'

import { useEffect, useRef, useCallback, useState, useMemo } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { Topology, GeometryCollection } from 'topojson-specification'
import regionData from '../mockdata/region.json'
import globalConnectionsData from '../mockdata/globalConnections.json'

interface WorldData extends Topology<{ countries: GeometryCollection }> {
  objects: {
    countries: GeometryCollection;
  };
}

function drawCurvedRoute(
  source: [number, number],
  target: [number, number],
): string {
  const dx = target[0] - source[0]
  const dy = target[1] - source[1]
  const dr = Math.sqrt(dx * dx + dy * dy)
  return `M${source[0]},${source[1]}A${dr},${dr} 0 0,1 ${target[0]},${target[1]}`
}

const cityCoordinates: { [key: string]: [number, number] } = {
  // Saudi Cities
  'Riyadh': [46.6753, 24.7136],
  'Makkah': [39.8579, 21.3891],
  'Jeddah': [39.1925, 21.8858],
  'Unayzah': [43.9951, 26.0845],
  'Jubail': [49.6225, 27.4174],
  'Qatif': [50.0115, 26.9196],
  'Buraydah': [43.9750, 26.3260],
  'Hail': [41.6957, 27.5219],
  'Khamis Mushait': [42.7333, 18.3000],
  'Madinah': [39.5692, 24.5247],
  'Yanbu': [38.1899, 24.0231],
  'Najran': [44.1277, 17.4922],
  'Taif': [40.4159, 22.1703],
  'Al-Ahsa': [49.6167, 25.3833],
  'Khobar': [50.1971, 26.0172],
  'Dammam': [50.0888, 26.4207],
  'Tabuk': [36.5662, 28.3835],
  'Sabya': [42.6254, 17.1495],
  'Jazan': [42.5511, 16.8892],
  'Muzahimiyah': [46.2667, 24.4667],
  'Bisha': [42.5987, 20.0005],

  // Destinations
  'London': [-0.1278, 51.5074],
  'Italy': [12.5674, 41.8719],
  'Spain': [-3.7492, 40.4637],
  'UAE': [55.2708, 25.2048],
  'Turkey': [35.2433, 38.9637],
  'Germany': [10.4515, 51.1657],
  'Sweden': [18.6435, 60.1282],
  'Morocco': [-7.0926, 31.7917],
  'Egypt': [30.8025, 26.8206],
  'Netherlands': [5.2913, 52.1326],
  'Singapore': [103.8198, 1.3521],
  'Jordan': [36.2384, 30.5852],
  'Dubai': [55.2708, 25.2048],
  'Switzerland': [8.2275, 46.8182]
}

interface GlobalRoute {
  source: string;
  destination: string;
}

interface LocalRoute {
  source: string;
  count: number;
}

type Route = GlobalRoute | LocalRoute;

// Move mapDimensions outside the component
const mapDimensions = {
  global: {
    width: 1200,
    height: 600,
    center: [0, 30] as [number, number],
    scale: (width: number) => width / 2 / Math.PI
  },
  saudi: {
    width: 600,
    height: 800,
    center: [45, 25] as [number, number],
    scale: (width: number) => width * 4
  }
}

export default function Regional() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [viewMode, setViewMode] = useState<'global' | 'saudi'>('global')

  // Parse region data
  const apprenticeshipData = useMemo<Route[]>(() => {
    if (viewMode === 'global') {
      const rawData = globalConnectionsData[0]["Regional & Location Analytics"] || []
      return rawData.map(entry => ({
        source: entry.source,
        destination: entry.destination
      }))
    } else {
      const rawData = regionData[0]["Regional & Location Analytics"] || []
      return rawData.map(entry => ({
        source: entry.source,
        count: 1
      }))
    }
  }, [viewMode])

  const renderMap = useCallback(async () => {
    if (!svgRef.current) return

    try {
      const response = await fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      const worldData = (await response.json()) as WorldData

      // Filter connections based on view mode
      const connections = apprenticeshipData.filter(route => {
        if (viewMode === 'global') {
          return true // Show all connections in global view
        } else {
          return cityCoordinates[route.source] && 
                 cityCoordinates[route.source][1] > 15 && // Latitude check for Saudi cities
                 cityCoordinates[route.source][1] < 35    // Rough Saudi Arabia bounds
        }
      })

      const { width, height, center, scale } = mapDimensions[viewMode]

      // Clear previous content
      d3.select(svgRef.current).selectAll("*").remove()

      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .style("background", "#002E25")

      // Create projection with mode-specific settings
      const projection = d3.geoMercator()
        .center(center)
        .scale(scale(width))
        .translate([width / 2, height / 2])

      const path = d3.geoPath(projection)

      // Create container for map elements
      const g = svg.append("g")

      // Draw world map
      g.selectAll("path")
        .data(feature(worldData, worldData.objects.countries).features)
        .join("path")
        .attr("fill", "#1D4B44")
        .attr("d", path)
        .attr("stroke", "#4FD1C5")
        .attr("stroke-width", 0.5)

      // Draw routes only in global view
      if (viewMode === 'global') {
        const routesGroup = g.append("g").attr("class", "routes")
        connections.forEach((route: Route) => {
          if ('destination' in route && route.destination) {
            const sourceCoords = cityCoordinates[route.source]
            const destCoords = cityCoordinates[route.destination]

            if (sourceCoords && destCoords) {
              const sourcePos = projection(sourceCoords) as [number, number]
              const targetPos = projection(destCoords) as [number, number]

              // Draw route path
              routesGroup.append("path")
                .attr("class", "travel-route")
                .attr("d", drawCurvedRoute(sourcePos, targetPos))
                .attr("stroke", "#4FD1C5")
                .attr("stroke-width", 1.5)
                .attr("fill", "none")
                .attr("stroke-dasharray", "5,5")
                .attr("opacity", 0.6)

              // Add animated dots
              routesGroup.append("circle")
                .attr("r", 3)
                .attr("fill", "#fff")
                .append("animateMotion")
                .attr("dur", "3s")
                .attr("repeatCount", "indefinite")
                .attr("path", drawCurvedRoute(sourcePos, targetPos))
            }
          }
        })
      }

      // Draw cities with counts
      const cityCounts = connections.reduce((acc: {[key: string]: number}, route) => {
        acc[route.source] = (acc[route.source] || 0) + 1
        return acc
      }, {})

      Object.entries(cityCoordinates).forEach(([city, coords]) => {
        // Skip non-Saudi cities in Saudi view
        if (viewMode === 'saudi' && !cityCounts[city]) return
        
        // In global view, only show cities that are part of active connections
        if (viewMode === 'global') {
          const isActiveCity = connections.some(route => 
            route.source === city || ('destination' in route && route.destination === city)
          )
          if (!isActiveCity) return
        }

        const [x, y] = projection(coords) as [number, number]
        
        const cityGroup = g.append("g")
          .attr("transform", `translate(${x},${y})`)

        // City dot
        cityGroup.append("circle")
          .attr("r", viewMode === 'saudi' ? 
            (cityCounts[city] ? Math.log(cityCounts[city] + 1) * 5 : 4) : 4)
          .attr("fill", "#4FD1C5")
          .attr("class", "city-marker")

        // City label
        cityGroup.append("text")
          .attr("x", 8)
          .attr("y", 4)
          .attr("fill", "white")
          .attr("font-size", "10px")
          .text(viewMode === 'saudi' && cityCounts[city] ? 
            `${city} (${cityCounts[city]})` : city)
      })

      // Add zoom capabilities
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
          g.attr("transform", event.transform.toString())
        })

      svg.call(zoom)

    } catch (error) {
      console.error('Error rendering map:', error)
    }
  }, [viewMode, apprenticeshipData])

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes dash {
        to {
          stroke-dashoffset: 20;
        }
      }
      .travel-route {
        animation: dash 1s linear infinite;
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
      }
      .city-marker {
        animation: pulse 2s infinite;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    renderMap()
  }, [renderMap, viewMode])

  return (
    <div className="bg-[#002E25] rounded-lg">
      <div className="p-6">
        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setViewMode('global')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'global' 
                ? 'bg-teal-600 text-white' 
                : 'bg-teal-900 text-teal-100'
            }`}
          >
            Global View
          </button>
          <button
            onClick={() => setViewMode('saudi')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'saudi' 
                ? 'bg-teal-600 text-white' 
                : 'bg-teal-900 text-teal-100'
            }`}
          >
            Saudi Arabia View
          </button>
        </div>

        <div className={`overflow-hidden ${
          viewMode === 'global' ? 'h-[600px]' : 'h-[800px]'
        }`}>
          <svg ref={svgRef} />
        </div>
      </div>
    </div>
  )
}
