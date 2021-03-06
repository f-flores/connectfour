// ==========================================================
//
// File name: API.js
// Date: March, 2019
// Description: Application interface between front end
//  and backend.
//
// ==========================================================

import axios from 'axios';

export default {
  // Obtains active player list
  getActivePlayers: function() {
    return axios.get("/api/player/activelist");
  },
  signinPlayer: function(postInfo) {
    return axios.post("/api/player", postInfo);
  },
  leavePlayer: function(pNum) {
    console.log(`API call: /api/player/leave/${pNum}`)
    return axios.delete(`/api/player/leave/${pNum}`);
  }
/*   getRecentReports: function(query){
      return axios.get("/api/reports/recent", {params: query})
  },
  // Get & Update All Counts
  updateCounts: function(query) {
      return axios.get("/api/counts/add", {params: query})
  },
  // Post Cheater
  postSystems: function(postInfo) {
      return axios.post("/api/systems", postInfo)
  }, */
}
