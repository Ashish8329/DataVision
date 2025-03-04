# Create your models here.
from django.db import models


class DataInfo(models.Model):
    intensity = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Intensity",
        help_text="Measure of impact intensity",
    )
    likelihood = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Likelihood",
        help_text="Probability of occurrence",
    )
    relevance = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Relevance",
        help_text="Significance of the data",
    )
    start_year = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Start Year",
        help_text="Starting year of the event",
    )
    end_year = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="End Year",
        help_text="Ending year of the event",
    )
    country = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Country",
        help_text="Country associated with the data",
    )
    region = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Region",
        help_text="Region associated with the data",
    )
    topic = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="Topic",
        help_text="Specific topic of the data",
    )
    sector = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="sector",
        help_text="Specific sector of the data",
    )
    insight = models.TextField(
        null=True,
        blank=True,
        verbose_name="Insight",
        help_text="Insight related to the data",
    )
    url = models.URLField(
        null=True, blank=True, verbose_name="URL", help_text="Source URL for the data"
    )
    impact = models.TextField(
        null=True, blank=True, verbose_name="Impact", help_text="Impact description"
    )
    added = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Added",
        help_text="Date and time the data was added",
    )
    published = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Published",
        help_text="Date and time the data was published",
    )
    pestle = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name="PESTLE",
        help_text="PESTLE category of the data",
    )
    source = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        verbose_name="Source",
        help_text="Source of the data",
    )
    title = models.TextField(
        null=True,
        blank=True,
        verbose_name="Title",
        help_text="Title of the data insight",
    )

    class Meta:
        verbose_name = "Data Visualization"
        verbose_name_plural = "Data Visualization"

    def __str__(self):
        return f"{self.title or 'Data'} ({self.start_year or 'Unknown'}) - {self.country or 'Unknown'}"
