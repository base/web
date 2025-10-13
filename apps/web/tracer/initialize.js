const ddtracer = require('dd-trace');

const initTracer = () => {
  const { tracer } = ddtracer;
  tracer.init({
    service: process.env.CODEFLOW_PROJECT_NAME,
    // Enables tracking performance trends across versions. Using commit hash as
    // code changes most often result in performance changes (vs deploys).
    //
    // Codeflow Docs: https://confluence.coinbase-corp.com/pages/viewpage.action?pageId=1172681623
    // Datadog Docs: https://datadoghq.dev/dd-trace-js/
    version: process.env.CODEFLOW_COMMIT_HASH,
    profiling: true,
    runtimeMetrics: true,
    // 192.168.133.7 is the default datadog-agent port for odin deploys
    hostname: '192.168.133.7',
    // port for traces and APM metrics
    port: 8126,
    dogstatsd: {
      hostname: '192.168.133.7',
      // port for statsd metrics
      port: 8125,
    },
    env: process.env.CODEFLOW_ENVIRONMENT,
  });

  tracer.use('http', {
    enabled: true,
    service: process.env.CODEFLOW_PROJECT_NAME,
    blocklist: [/_health/, /500/],
  });

  return tracer;
};

tracer = initTracer();
