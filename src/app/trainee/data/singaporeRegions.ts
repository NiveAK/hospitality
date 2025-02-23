// Define interfaces for the data structure
interface Coordinates {
  type: 'Polygon';
  properties: {
    name: string;
    code: string;
  };
  coordinates: number[][][];
}

interface TopologyData {
  type: string;
  arcs: number[][][];
  objects: {
    states: {
      type: string;
      geometries: Coordinates[];
    };
  };
  transform: {
    scale: number[];
    translate: number[];
  };
}

// Export the data as a constant
export const singaporeRegions: TopologyData = {
  type: "Topology",
  arcs: [],
  objects: {
    states: {
      type: "GeometryCollection",
      geometries: [
        {
          type: "Polygon",
          properties: {
            name: "Central Region",
            code: "CR"
          },
          coordinates: [[[103.812, 1.264], [103.912, 1.264], [103.912, 1.364], [103.812, 1.364], [103.812, 1.264]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "East Region",
            code: "ER"
          },
          coordinates: [[[103.912, 1.264], [104.012, 1.264], [104.012, 1.364], [103.912, 1.364], [103.912, 1.264]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "North Region",
            code: "NR"
          },
          coordinates: [[[103.812, 1.364], [103.912, 1.364], [103.912, 1.464], [103.812, 1.464], [103.812, 1.364]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "North-East Region",
            code: "NER"
          },
          coordinates: [[[103.912, 1.364], [104.012, 1.364], [104.012, 1.464], [103.912, 1.464], [103.912, 1.364]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "West Region",
            code: "WR"
          },
          coordinates: [[[103.712, 1.264], [103.812, 1.264], [103.812, 1.364], [103.712, 1.364], [103.712, 1.264]]]
        }
      ]
    }
  },
  transform: {
    scale: [1, 1],
    translate: [0, 0]
  }
}; 