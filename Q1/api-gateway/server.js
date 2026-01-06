const express = require("express");
const proxy = require("express-http-proxy");
const app = express();

const proxyTo = (serviceHost) => {
	return proxy(serviceHost, {
		proxyReqPathResolver: function (req) {
			// Forward the full original URL so services receive the same path
			return req.originalUrl;
		}
	});
};

app.use("/auth", proxyTo("http://auth-service:4001"));
app.use("/users", proxyTo("http://patient-service:4002"));
app.use("/doctors", proxyTo("http://doctor-service:4003"));
app.use("/appointments", proxyTo("http://appointment-service:4004"));

app.get("/health", (_, res) => res.send("Gateway OK"));

app.listen(4000, () => console.log("API Gateway on 4000"));
