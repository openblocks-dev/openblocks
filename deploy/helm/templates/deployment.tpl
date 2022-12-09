apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "helm.fullname" . }}
  labels:
    {{- include "helm.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "helm.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      {{- with .Values.podAnnotations }}
      annotations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      labels:
        {{- include "helm.selectorLabels" . | nindent 8 }}
    spec:
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      serviceAccountName: {{ include "helm.serviceAccountName" . }}
      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}
      containers:
        - name: {{ .Chart.Name }}
          securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag  }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: openblocks
              containerPort: {{ .Values.container.port }}
              protocol: TCP       
          env:
            {{- toYaml .Values.global.envVars | nindent 12 }}
          volumeMounts:
            - name: openblocks-stacks
              mountPath: "/stacks"   
                      
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
      volumes:
        - name: openblocks-stacks
          persistentVolumeClaim:
            claimName: openblocks-stacks
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}