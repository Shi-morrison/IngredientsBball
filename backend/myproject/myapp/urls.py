from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_nba_data, name="get_nba_data"),
    # path("", views.search_player, name="search_player"),
]