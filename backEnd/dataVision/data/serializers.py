from rest_framework.serializers import ModelSerializer
from .models import DataInfo

class VisualizationDataSerializer(ModelSerializer):
    class Meta:
        model = DataInfo
        fields = '__all__'
