const DYNAMIC_SEGMENT_REGEX = /{{([\s\S]*?)}}/;

export function isDynamicSegment(segment: string): boolean {
  return DYNAMIC_SEGMENT_REGEX.test(segment);
}

export function getDynamicStringSegments(input: string): string[] {
  const segments = [];
  let position = 0;
  let start = input.indexOf("{{");
  while (start >= 0) {
    let i = start + 2;
    while (i < input.length && input[i] === "{") i++;
    let end = input.indexOf("}}", i);
    if (end < 0) {
      break;
    }
    const nextStart = input.indexOf("{{", end + 2);
    const maxIndex = nextStart >= 0 ? nextStart : input.length;
    const maxStartOffset = i - start - 2;
    let sum = i - start;
    let minValue = Number.MAX_VALUE;
    let minOffset = Number.MAX_VALUE;
    for (; i < maxIndex; i++) {
      switch (input[i]) {
        case "{":
          sum++;
          break;
        case "}":
          sum--;
          if (input[i - 1] === "}") {
            const offset = Math.min(Math.max(sum, 0), maxStartOffset);
            const value = Math.abs(sum - offset);
            if (value < minValue || (value === minValue && offset < minOffset)) {
              minValue = value;
              minOffset = offset;
              end = i + 1;
            }
          }
          break;
      }
    }
    segments.push(input.slice(position, start + minOffset), input.slice(start + minOffset, end));
    position = end;
    start = nextStart;
  }
  segments.push(input.slice(position));
  return segments.filter((t) => t);
}
