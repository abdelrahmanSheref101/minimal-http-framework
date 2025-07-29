//
import http from "http";
import Server from "./server.js";
import Router from "./router.js";


//middlewares defines////////////////////////////////////////////////
const bodyParsing = async (req, res, next) => {
        if (!["PATCH", "PUT", "POST"].includes(req.method)) next();

        try {
                req.body = await new Promise((resolve, reject) => {
                        let bodyData = "";
                        req.on("data", (chunk) => (bodyData += chunk.toString()));

                        req.on("end", () => {
                                try {
                                        let body = bodyData;

                                        const parsingType = req.headers["content-type"] || "";

                                        if (parsingType.includes("application/json")) {
                                                body = JSON.parse(bodyData);
                                        } else if (
                                                parsingType.includes("application/x-www-form-urlencoded")
                                        ) {
                                                body = Object.fromEntries(new URLSearchParams(bodyData));
                                        }
                                        resolve(body);
                                } catch (err) {
                                        console.log("ERROR in request body parser : ", err);
                                        reject(err);
                                }
                        }); //END of req.on end

                        req.on("error", reject);
                }); //END OF req.body = await ...

                next();
        } catch (error) {
                next(error);
        }
};

//TODO: refine error handling
function makeValidateTarget(router) {
        return function(req, res, next) {
                if (!router.hasTarget(req.method, req.url)) {
                        next("404 doesn't exist");
                }
                next();
        };
}

//TODO: refine the error handling
function makeDispatch(router) {
        return function(req, res, next) {
                const handler = router.resolve(req.method, req.url);

                if (handler) {
                        try {
                                handler(req, res);
                        } catch (error) {
                                next(error);
                        }
                } else {
                        let err = new Error();
                        err.message = "404 doesn't exist";
                        err.statusCode = 404;
                        next(err);
                }
                next();
        };
}

function setSharedHeaders(req, res, next) {
        //TODO: set common headers ,like cors , security , ...etc
        next();
}

function parseUrlParams(req, res, next) {
        //TODO: parse the url parameters (query and path) params
        //attach em to the res.url.params
        //make res.url it self just the target
        //NOTE: use searchParamsurl api
        next();
}

let mw = new Server();

let router = new Router();
//register needed endpoints here
router.register("GET", "/api/v1/hello", (req, res) => {
        res.setStatusCode = 200;
        res.setHeader("content-type", "text/plain");
        res.end("Hello, World!\n");
});

//TODO: adapt to different types of content types
router.register("POST", "/api/v1/echo", (req, res) => {
        let body = JSON.stringify(req.body);

        res.writeHead(200, {
                "content-type": "application/json",
                "content-length": Buffer.byteLength(body),
        });

        res.end(body);
});

//register needed middlewares here
mw.use(bodyParsing);
//using factory pattern to inject router object
mw.use(makeValidateTarget(router));
// mw.use(setSharedHeaders);
// mw.use(parseUrlParams);
mw.use(makeDispatch(router));

let server = http.createServer((req, res) => mw.run(req, res));
server.listen(3000, () => {
        console.log("Server running at http://localhost:3000/");
});
