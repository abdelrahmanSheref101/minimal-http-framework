//
export default class Server {
        constructor() {
                this.middlewares = [];
        }

        use(mWare) {
                this.middlewares.push(mWare);
        }

        async run(req, res) {
                let index = 0;
                const next = async (err) => {
                        if (err) return this.errorHandler(err);

                        if (index >= this.middlewares.length) return;

                        const middleware = this.middlewares[index++];

                        try {
                                await middleware(req, res, next);
                        } catch (error) {
                                next(error);
                        }
                };

                next();
        }

        errorHandler(err) {
                console.log("TODO:add error handling");
                console.log(err.toString());
        }
}
