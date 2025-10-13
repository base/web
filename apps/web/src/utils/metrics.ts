import { tracer } from 'dd-trace';

type Metric = {
  metric: string;
  point: number;
  tags?: Record<string, string | number>;
};

export async function sendMetric(metric: Metric) {
  tracer.dogstatsd.increment(metric.metric, metric.point, metric.tags);
}

export async function measureExecutionTime<T>(
  metricName: string,
  fn: () => Promise<T>,
  tags: Record<string, string | number>,
): Promise<T> {
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  const durationMs = endTime - startTime;

  // Send the execution time as a metric
  tracer.dogstatsd.gauge(metricName, durationMs, tags);

  return result;
}
