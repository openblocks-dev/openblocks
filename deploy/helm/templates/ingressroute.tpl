apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: {{ .Chart.Name }}-ingressroute
spec:
  entryPoints:
    - websecure
  routes:
  - kind: Rule
    match: PathPrefix(`/{{ .Chart.Name }}`)
    services:
    - kind: Service
      name: {{ include "helm.fullname" . }}
      port: {{ .Values.service.port }}
      responseForwarding:
        flushInterval: 1ms
      scheme: http
      strategy: RoundRobin
      weight: 10 