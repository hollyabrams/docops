export type ApiParameter = {
  name: string;
  type: string;
  description: string;
};

export const healthResponseParameters: ApiParameter[] = [
  {
    name: "score",
    type: "integer",
    description: "Overall documentation health score from 0 to 100.",
  },
  {
    name: "status",
    type: "string",
    description:
      "Overall documentation health status: healthy, needs-attention, or unhealthy.",
  },
  {
    name: "checks",
    type: "HealthCheck[]",
    description:
      "Individual checks used to calculate the documentation health score.",
  },
];
