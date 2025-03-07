from django.db import models

class Skill(models.Model):
    SKILL_TYPES = [
        ('LANG', 'Programming Languages'),
        ('FRAM', 'Frameworks'),
        ('TOOL', 'Tools'),
        ('ADD', 'Additional Skills')
    ]

    name = models.CharField(max_length=100)
    icon_class = models.CharField(max_length=50, help_text="Font Awesome class (e.g., 'fab fa-python')")
    skill_type = models.CharField(max_length=4, choices=SKILL_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['skill_type', 'name']

    def __str__(self):
        return f"{self.get_skill_type_display()} - {self.name}"

class Achievement(models.Model):
    ACHIEVEMENT_TYPES = [
        ('PROJECT', 'Project'),
        ('CERTIFICATE', 'Certificate'),
        ('BADGE', 'Badge'),
    ]

    name = models.CharField(max_length=200)
    achievement_type = models.CharField(max_length=20, choices=ACHIEVEMENT_TYPES)
    description = models.TextField(blank=True)
    date_achieved = models.DateField()
    
    # Optional links
    badge_image = models.URLField(blank=True, null=True)
    certificate_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    display_image = models.URLField(blank=True, null=True, help_text="Image to display for certificates/projects")
    
    class Meta:
        ordering = ['-date_achieved']

    def __str__(self):
        return f"{self.name} ({self.achievement_type})"
