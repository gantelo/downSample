type Point = number[];
type Series = Point[];
type Threshold = number;

type Props = {
  series: Series;
  threshold: Threshold;
};

const floor = Math.floor;
const abs = Math.abs;

// TODO: adapt to use single array instead of points.
export const downsample = ({ series, threshold }: Props): Series => {
  const seriesLength: number = series.length;

  if (threshold >= seriesLength || threshold <= 0) {
    return series;
  }

  const sampled: Series = [];
  let sampledIndex = 0;

  const bucketSize = (seriesLength - 2) / (threshold - 2);

  let initialPointInTriangle = 0;
  let maxAreaPoint: Point;
  let maxArea: number;
  let area: number;
  let nextPointInTriangle: number;

  sampled[sampledIndex++] = series[initialPointInTriangle]; // Always add the first point

  for (let i = 0; i < threshold - 2; i++) {
    // Calculate point average for next bucket (containing c)
    let averageX = 0;
    let averageY = 0;
    let avgRangeStart = floor((i + 1) * bucketSize) + 1;
    let avgRangeEnd = floor((i + 2) * bucketSize) + 1;
    avgRangeEnd = avgRangeEnd < seriesLength ? avgRangeEnd : seriesLength;

    const avgRangeLength = avgRangeEnd - avgRangeStart;

    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      averageX += series[avgRangeStart][0] * 1; // * 1 enforces Number (value may be Date)
      averageY += series[avgRangeStart][1] * 1;
    }
    averageX /= avgRangeLength;
    averageY /= avgRangeLength;

    // Get range for bucket
    let rangeOffs = floor((i + 0) * bucketSize) + 1;
    const rangeTo = floor((i + 1) * bucketSize) + 1;

    // Point of triangle
    const pointTriangleX = series[initialPointInTriangle][0] * 1;
    const pointTriangleY = series[initialPointInTriangle][1] * 1;

    maxArea = area = -1;

    for (; rangeOffs < rangeTo; rangeOffs++) {
      // Calculate triangle area over three buckets
      area =
        abs(
          (pointTriangleX - averageX) *
            (series[rangeOffs][1] - pointTriangleY) -
            (pointTriangleX - series[rangeOffs][0]) *
              (averageY - pointTriangleY)
        ) * 0.5;
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = series[rangeOffs];
        nextPointInTriangle = rangeOffs;
      }
    }

    sampled[sampledIndex++] = maxAreaPoint; // Pick this point from the bucket
    initialPointInTriangle = nextPointInTriangle; // This a is the next a (chosen b)
  }

  sampled[sampledIndex++] = series[seriesLength - 1]; // Always add last

  return sampled;
};
