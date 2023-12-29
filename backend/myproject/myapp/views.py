from django.shortcuts import render
from django.http import JsonResponse
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, assistleaders, playerprofilev2, playerfantasyprofile
import pandas as pd
from django.http import HttpResponse
import json
# Create your views here.
def get_nba_data(request):
    
    # Fetch lebron id
    lebron_id = players.find_players_by_first_name("LeBron")[0]["id"]
    career_data = playerfantasyprofile.PlayerFantasyProfile(player_id=lebron_id)
    career_stats = career_data.get_normalized_dict()
    # Dispay the data
    print(career_stats)
    overall_stats = career_stats['Overall'][0] if 'Overall' in career_stats else {}
    return JsonResponse(overall_stats, safe=False)
  

    # Manipulate or process the data as needed
    # ...

    # Return a response
    # return HttpResponse("Hello, world. You're at the polls index.")
    return JsonResponse(career.get_json(), safe=False)