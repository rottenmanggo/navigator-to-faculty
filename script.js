const map = L.map('map', {maxZoom: 18}).setView([-3.217373, 104.648737], 16);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri',
  subdomains: ['server', 'services']
}).addTo(map);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    pane: 'overlayPane', 
    attribution: 'Esri World Boundaries'
}).addTo(map);

const graph = {
  "Auditorium": { "Rektorat": 112, "Sp FKM": 49 },
  "Sp FKM": { "Auditorium": 49, "FKM": 307, "Sp FK": 178 },
  "FKM": { "Sp FKM": 307 },
  "FK": { "Sp FK": 105, "Sp FT": 85 },
  "Sp FK": { "FK": 105, "Gedung Bahasa": 35 },
  "Gedung Bahasa": { "Sp FK": 35, "Sp Gedung Bahasa": 101 },
  "Sp Gedung Bahasa": { "Gedung Bahasa": 101, "Sp Perpustakaan Depan 1": 40, "Sp FT": 134 },
  "Sp Perpustakaan Depan 1": { "Sp Gedung Bahasa": 40, "Perpustakaan Depan": 71 },
  "Perpustakaan Depan": { "Sp Perpustakaan Depan 1": 71, "Sp Perpustakaan Depan 2": 91 },
  "Sp FT": { "FK": 85, "FT": 78, "Sp Gedung Bahasa": 134},
  "FT": { "Sp FT": 78, "FMIPA": 142 },
  "FMIPA": { "FT": 142, "Sp FMIPA 1": 44, "Sp FMIPA 3": 43 },
  "Sp FMIPA 1": { "FMIPA": 44, "Sp FMIPA 2": 41 },
  "Sp FMIPA 2": { "Sp FMIPA 1": 41, "Sp MPK": 137 },
  "Sp FMIPA 3": { "FMIPA": 43, "Sp FP 1": 50 },
  "Sp FP 1": { "Sp FMIPA 3": 50, "FP": 146 },
  "FP": { "Sp FP 1": 146, "Sp FP 2": 64 },
  "Sp FP 2": { "FP": 64, "FKIP A": 66, "Terminal A": 83 },
  "FKIP A": { "Sp FP 2": 66, "Sp FKIP A": 86 },
  "Sp FKIP A": { "FKIP A": 86, "Sp FASILKOM": 81 },
  "Sp FASILKOM": { "Sp FKIP A": 81, "FASILKOM": 38, "Terminal B": 35 },
  "FASILKOM": { "Sp FASILKOM": 38, "FKIP B": 197, "FE": 96},
  "FKIP B": { "FASILKOM": 197 },
  "Terminal B": { "Sp FASILKOM": 35, "Sp FE 2": 67 },
  "Sp FE 1": { "Sp Parkiran Perpus": 82, "Sp FE 2": 17 },
  "Sp FE 2": { "Sp FE 1": 17, "FE": 38, "Terminal B": 67 },
  "FE": { "Sp FE 2": 38, "FASILKOM": 96 },
  "Sp Parkiran Perpus": { "Sp FE 1": 82, "Sp FISIP 1": 76, "Parkiran Perpustakaan": 111, "Sp FISIP 2": 37 },
  "Sp FISIP 1": { "Sp Parkiran Perpus": 76, "Sp Perpustakaan Depan 2": 149, "FISIP": 37 },
  "Parkiran Perpustakaan": { "Sp Terminal": 74, "Sp Perpustakaan Depan 2": 74, "Sp Parkiran Perpus": 111 },
  "Sp Perpustakaan Depan 2": { "Perpustakaan Depan": 91, "Parkiran Perpustakaan": 74, "Sp FISIP 1": 149 },
  "Sp FISIP 2": { "Sp Parkiran Perpus": 37, "FISIP": 76 },
  "FISIP": { "Sp FISIP 2": 76, "FH": 161 },
  "FH": { "FISIP": 161, "Sp FH": 140 },
  "Sp FH": { "FH": 140, "Rektorat": 200 },
  "Rektorat": { "Sp FH": 200, "Auditorium": 112 },
  "Sp Terminal": { "Parkiran Perpustakaan": 74, "MPK": 92, "Sp FE 1": 126 },
  "MPK": { "Sp Terminal": 92, "Sp MPK": 72, "Terminal A": 114 },
  "Sp MPK": { "MPK": 72, "Sp Perpustakaan Depan 1": 149, "Sp FMIPA 2": 137 },
  "Terminal A": { "MPK": 114, "Sp FP 2": 44 }
};

// 3. Koordinat Node
const nodeCoords = {
  "Auditorium": [-3.213872, 104.648174],
  "Sp FKM": [-3.213872, 104.647738],
  "FKM": [-3.213872, 104.644978],
  "FK": [-3.216138, 104.647068],
  "Sp FK": [-3.215469, 104.647732],
  "Gedung Bahasa": [-3.215783, 104.647732],
  "Sp Gedung Bahasa": [-3.216693, 104.647732],
  "Sp Perpustakaan Depan 1": [-3.216693, 104.648091],
  "Perpustakaan Depan": [-3.216693, 104.648734],
  "Sp FT": [-3.216673, 104.646523],
  "FT": [-3.217373, 104.646523],
  "FMIPA": [-3.218647, 104.646523],
  "Sp FMIPA 1": [-3.218400, 104.646841],
  "Sp FMIPA 2": [-3.218032, 104.646841],
  "Sp FMIPA 3": [-3.219032, 104.646534],
  "Sp FP 1": [-3.219475, 104.646850],
  "FP": [-3.219475, 104.648157],
  "Sp FP 2": [-3.219475, 104.648733],
  "FKIP A": [-3.219475, 104.649325],
  "Sp FKIP A": [-3.219475, 104.650103],
  "Sp FASILKOM": [-3.219121, 104.650551],
  "FASILKOM": [-3.219096, 104.650892],
  "FKIP B": [-3.220839, 104.650892],
  "Terminal B": [-3.218808, 104.650551],
  "Sp FE 1": [-3.218075, 104.650551],
  "Sp FE 2": [-3.218229, 104.650551],
  "FE": [-3.218229, 104.650892],
  "Sp Parkiran Perpus": [-3.217365, 104.650551],
  "Sp FISIP 1": [-3.216684, 104.650551],
  "Parkiran Perpustakaan": [-3.217365, 104.649553],
  "Sp Perpustakaan Depan 2": [-3.216693, 104.649553],
  "Sp FISIP 1": [-3.216684, 104.650551],
  "Sp FISIP 2": [-3.217365, 104.650890],
  "FISIP": [-3.216684, 104.650890],
  "FH": [-3.215235, 104.650890],
  "Sp FH": [-3.213975, 104.650890],
  "Rektorat": [-3.213872, 104.649183],
  "Sp Terminal": [-3.218032, 104.649553],
  "MPK": [-3.218032, 104.648731],
  "Sp MPK": [-3.218032, 104.648083],
  "Terminal A": [-3.219076, 104.648731]
};

function dijkstra(graph, start, finish) {
  const dist = {};
  const prev = {};
  const pq = [];

  for (let v in graph) {
    dist[v] = Infinity;
    prev[v] = null;
  }

  if (!graph[start]) return null;

  dist[start] = 0;
  pq.push([0, start]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [curDist, node] = pq.shift();

    if (node === finish) break;
    if (curDist > dist[node]) continue;

    for (let neighbor in graph[node]) {
      const weight = graph[node][neighbor];
      const newDist = curDist + weight;

      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        prev[neighbor] = node;
        pq.push([newDist, neighbor]);
      }
    }
  }

  if (dist[finish] === Infinity) return null;

  let path = [];
  let cur = finish;
  while (cur !== null) {
    path.push(cur);
    cur = prev[cur];
  }
  path.reverse();

  return { distance: dist[finish], path };
}

let startNode = null;
let endNode = "FASILKOM";
let polyline = null;
let markers = {};

function drawMarkers() {
  for (let node in nodeCoords) {
    if (!node.startsWith("Sp")) {
      let color = (node === "FASILKOM") ? "#d32f2f" : "#007bff";
      let fillColor = (node === "FASILKOM") ? "#ffebee" : "white";

      const marker = L.circleMarker(nodeCoords[node], {
        radius: 8, 
        color: color, 
        fillColor: fillColor, 
        fillOpacity: 1,
        weight: 2
      })
      .addTo(map)
      .bindTooltip(node, {permanent: false, direction: "top"});
      
      marker.on("click", () => onNodeClick(node));
      markers[node] = marker;
    }
  }
}

function onNodeClick(node) {
  if (startNode && polyline) {
    fullReset(false);
  }

  startNode = node;
  endNode = "FASILKOM";

  updateMarkerStyle(startNode, "green");
  updateMarkerStyle(endNode, "red");

  document.getElementById("resetBtn").style.display = "block";
  
  calculatePath();
}

function updateMarkerStyle(node, color) {
  if (markers[node]) {
    markers[node].setStyle({
      color: color,
      fillColor: color === "green" ? "#e8f5e9" : "#ffebee",
      radius: 10
    });
  }
}

function calculatePath() {
  const resultDiv = document.getElementById("result");
  const result = dijkstra(graph, startNode, endNode);

  if (!result) {
    resultDiv.innerHTML = `<b>Start:</b> ${startNode}<br><b>End:</b> ${endNode}<br><span style="color:red">Jalur tidak ditemukan!</span>`;
    return;
  }

  const { distance, path } = result;
  
  const walkingSpeed = 80;
  const timeMinutes = Math.ceil(distance / walkingSpeed); 

  const latlngs = path.map(p => nodeCoords[p]);
  
  if (polyline) map.removeLayer(polyline);
  
  polyline = L.polyline(latlngs, { 
    color: "#d32f2f", 
    weight: 6,
    opacity: 0.8,
    lineJoin: 'round'
  }).addTo(map);

  map.fitBounds(polyline.getBounds(), {padding: [50, 50]});

  resultDiv.innerHTML = `
    <b>Start:</b> ${startNode}<br>
    <b>Tujuan:</b> ${endNode}<br>
    <div class="metric-box">
      Jarak: <b>${distance} meter</b><br>
      Waktu (Jalan Kaki): <span class="highlight-time">±${timeMinutes} menit</span>
    </div>
    <small style="color:#999;">*Rute: ${path.join(" → ")}</small>
  `;
}

window.fullReset = function(resetView = true) {
  startNode = null;
  
  if (polyline) {
    map.removeLayer(polyline);
    polyline = null;
  }

  for (let node in markers) {
    let isFasilkom = (node === "FASILKOM");
    markers[node].setStyle({
      color: isFasilkom ? "#d32f2f" : "#007bff",
      fillColor: isFasilkom ? "#ffebee" : "white",
      radius: 8
    });
  }

  document.getElementById("result").innerHTML = "";
  document.getElementById("resetBtn").style.display = "none";
  
  if(resetView) {
      map.setView([-3.219096, 104.650892], 16);
  }
}

drawMarkers();