import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

/* command to get token curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=a7895bbee22f41819aaff0694e057a54&client_secret=9ed77b79da1743e989c07c0bcded1d5d"
"*/

let accessToken = "BQD3-6rKB_JVxUgdILXQWyDjUkP-IGOW-mPzWM2EvAE5PRxSWZURWoIWGUtQg5s2SXKCcqC1NwCtzcHcW-7uxdMpC8CpMTSLQioD_r-OQc3VQ3-dZIs"


function TopSongs(){
  const[songs, setsongs] = useState([]);

  useEffect(() => {
  async function fetchTopSongs() {
    const res = await fetch('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })


    const data = await res.json();
    const formattedData = data.tracks.map(item => ({
      name: item.name,
      release_date: item.album.release_date,
      images: item.album.images,
      trial_link: item.preview_url
    }));
    console.log(formattedData);
    setsongs(formattedData);
  }
  fetchTopSongs();
}, []);


return (
  <div style={{ backgroundColor: "black" }}>
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 mx-auto">Top releases</span>
      </div>
    </nav>
    <div className="container">
      <div className="row">
        {songs.map(song => (
          <div key={song.id} className="col-md-3 mb-4">
            <div className="card h-100">
              <img src={song.images[0].url} alt={song.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{song.name}</h5>
                <p className="card-text">Release Date: {song.release_date}</p>
                <Button style={{ position: 'absolute', top: '130px', textAlign: "center" }} variant="secondary"> 
                  <a href={song.trial_link} style={{ color: "white", textDecoration: "none" }}>Click to play</a> {/* Style the link within the button */}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default TopSongs;