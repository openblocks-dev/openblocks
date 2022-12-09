apiVersion: v1
kind: Service
metadata:
  name: {{ include "helm.fullname" . }}
  labels:
    {{- include "helm.labels" . | nindent 4 }}
spec:
  type: {{ .Values.service.type }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: {{ .Values.service.port }}
      protocol: TCP
      name: tomcat      
  selector:
    {{- include "helm.selectorLabels" . | nindent 4 }}