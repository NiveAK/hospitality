interface Coordinates {
  type: 'Polygon';
  properties: {
    name: string;
    code: string;
  };
  coordinates: number[][][];
}

interface MalaysiaStatesData {
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

export const malaysiaStatesData: MalaysiaStatesData = {
  type: "Topology",
  arcs: [],
  objects: {
    states: {
      type: "GeometryCollection",
      geometries: [
        {
          type: "Polygon",
          properties: {
            name: "Johor",
            code: "JHR"
          },
          coordinates: [[[103.427, 1.365], [104.127, 1.365], [104.127, 2.365], [103.427, 2.365], [103.427, 1.365]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Kuala Lumpur",
            code: "KUL"
          },
          coordinates: [[[101.612, 3.082], [101.762, 3.082], [101.762, 3.232], [101.612, 3.232], [101.612, 3.082]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Penang",
            code: "PNG"
          },
          coordinates: [[[100.179, 5.209], [100.379, 5.209], [100.379, 5.509], [100.179, 5.509], [100.179, 5.209]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Selangor",
            code: "SGR"
          },
          coordinates: [[[101.214, 2.682], [101.814, 2.682], [101.814, 3.782], [101.214, 3.782], [101.214, 2.682]]]
        }
      ]
    }
  },
  transform: {
    scale: [1, 1],
    translate: [0, 0]
  }
}; 