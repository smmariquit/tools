"use client";

import { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Polyline,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface RouteSelectorMapProps {
	onDistanceComputed: (distanceKm: number) => void;
}

function MapEvents({
	setOrigin,
	setDestination,
	origin,
	destination,
}: {
	setOrigin: (pos: [number, number]) => void;
	setDestination: (pos: [number, number] | null) => void;
	origin: [number, number] | null;
	destination: [number, number] | null;
}) {
	useMapEvents({
		click(e) {
			const pos: [number, number] = [e.latlng.lat, e.latlng.lng];
			if (!origin || (origin && destination)) {
				setOrigin(pos);
				setDestination(null);
			} else {
				setDestination(pos);
			}
		},
	});
	return null;
}

export default function RouteSelectorMap({
	onDistanceComputed,
}: RouteSelectorMapProps) {
	const [origin, setOrigin] = useState<[number, number] | null>(null);
	const [destination, setDestination] = useState<[number, number] | null>(null);
	const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([]);
	const [isComputing, setIsComputing] = useState(false);

	useEffect(() => {
		if (origin && destination) {
			const fetchRoute = async () => {
				setIsComputing(true);
				try {
					// OSRM API expects lon,lat
					const res = await fetch(
						`https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`,
					);
					const data = await res.json();

					if (data.code === "Ok" && data.routes.length > 0) {
						const route = data.routes[0];
						const distanceKm = route.distance / 1000;
						onDistanceComputed(distanceKm);

						// GeoJSON is lon, lat. Polyline expects lat, lon.
						const coordinates = route.geometry.coordinates.map(
							(coord: [number, number]) =>
								[coord[1], coord[0]] as [number, number],
						);
						setRouteGeometry(coordinates);
					} else {
						alert("Could not find a route between these points.");
						setRouteGeometry([]);
					}
				} catch (error) {
					console.error("Error fetching route:", error);
				} finally {
					setIsComputing(false);
				}
			};

			fetchRoute();
		} else {
			setRouteGeometry([]);
		}
	}, [origin, destination, onDistanceComputed]);

	// Center on Metro Manila by default
	return (
		<div style={{ position: "relative" }}>
			<div
				style={{
					fontSize: "12px",
					marginBottom: "8px",
					color: "var(--text-secondary)",
				}}
			>
				<strong>Instructions:</strong> Click on the map to set your{" "}
				<strong>Origin</strong>, then click again to set your{" "}
				<strong>Destination</strong>.
			</div>
			<div
				style={{
					height: "500px",
					width: "100%",
					borderRadius: "8px",
					overflow: "hidden",
					border: "1px solid var(--border-color)",
				}}
			>
				<MapContainer
					center={[14.5995, 120.9842]}
					zoom={11}
					style={{ height: "100%", width: "100%", zIndex: 0 }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<MapEvents
						setOrigin={setOrigin}
						setDestination={setDestination}
						origin={origin}
						destination={destination}
					/>
					{origin && (
						<Marker position={origin}>
							<Popup>Origin</Popup>
						</Marker>
					)}
					{destination && (
						<Marker position={destination}>
							<Popup>Destination</Popup>
						</Marker>
					)}
					{routeGeometry.length > 0 && (
						<Polyline positions={routeGeometry} color="#1565c0" weight={4} />
					)}
				</MapContainer>
			</div>
			{isComputing && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "white",
						padding: "8px 16px",
						borderRadius: "16px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
						fontSize: "12px",
						fontWeight: "bold",
						zIndex: 10,
					}}
				>
					Computing Route...
				</div>
			)}
		</div>
	);
}
