from django.shortcuts import render
from django.http import JsonResponse
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, assistleaders, playerprofilev2, playerfantasyprofile,commonplayerinfo
import pandas as pd
from django.http import HttpResponse
import json
# Create your views here.
def get_nba_data(request):
    
    # Fetch player stats
    lebron_id = players.find_players_by_first_name("LeBron")[0]["id"]
    career_data = playerfantasyprofile.PlayerFantasyProfile(player_id=lebron_id)
    career_stats = career_data.get_normalized_dict()
    
    # Fetch player info
    player_info = commonplayerinfo.CommonPlayerInfo(player_id=lebron_id)
    player_data = player_info.get_normalized_dict()
    print(player_data['PlayerHeadlineStats'])
   
    
    # overall_stats = career_stats['Overall'][0] if 'Overall' in career_stats else {}
    
    # Return player stats
    return JsonResponse(career_stats['Overall'], safe=False)
  


def search_player(request):
    # Get the search query from request parameters
    search_query = request.GET.get('name', '')

    try:
        # Find player by name
        player_dict = players.get_players()
        player = [player for player in player_dict if player['full_name'].lower() == search_query.lower()]

        if not player:
            return HttpResponse("Player not found", status=404)

        player_id = player[0]['id']

        # Fetch player info using nba_api
        player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id)
        player_data = player_info.get_normalized_dict()

        return JsonResponse(player_data, safe=False)

    except Exception as e:
        return HttpResponse(f"An error occurred: {e}", status=500)