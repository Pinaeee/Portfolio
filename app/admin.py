from django.contrib import admin
from .models import Skill, Achievement

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'skill_type', 'icon_class', 'created_at')
    list_filter = ('skill_type',)
    search_fields = ('name',)

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('name', 'achievement_type', 'date_achieved')
    list_filter = ('achievement_type',)
    search_fields = ('name', 'description')