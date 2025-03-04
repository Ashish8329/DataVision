from django.shortcuts import render
from rest_framework import viewsets
from .models import DataInfo
from .serializers import VisualizationDataSerializer
from rest_framework.response import Response
from django.db.models import Sum, Count

 
class DashBoardViewSet(viewsets.ModelViewSet):
    queryset = DataInfo.objects.all()
    serializer_class = VisualizationDataSerializer

    def list(self, request):
            
            # Bar Chart Data - Intensity vs Sector
            barchartdata = DataInfo.objects.values('sector').annotate(total_intensity=Sum('intensity'))
            
            # Trendline Data - Intensity vs Year
            trendchartdata = DataInfo.objects.values('end_year').annotate(total_intensity=Sum('intensity'))
            
            # Donut Chart Data - Count of occurrences for each topic
            donatechartdata = DataInfo.objects.values('topic').annotate(topic_count=Count('topic'))
            
            # Easing Animation Trendline - Likelihood values by Region
            animationchartdata = DataInfo.objects.values('region').annotate(likelihood_count=Sum('likelihood'))
            
            return Response({
                "barchartdata": {item['sector']: item['total_intensity'] for item in barchartdata if item['sector']},
                "trendchartdata": {item['end_year']: item['total_intensity'] for item in trendchartdata if item['end_year']},
                "donatechartdata": {item['topic']: item['topic_count'] for item in donatechartdata if item['topic']},
                "animationchartdata": {item['region']: item['likelihood_count'] for item in animationchartdata if item['region']},
            })
