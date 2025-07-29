//
export default class Router {
        constructor() {
                this.routs = new Map();
                this.paramRouts = new Map();
        }

        register(method, path, handler) {
                //TODO: is it parameterised ? if yes pass to _registerParamRout
                if (!this.routs.has(method)) this.routs.set(method, new Map());

                this.routs.get(method).set(path, handler);
        }

        resolve(method, path) {
                //TODO : if it's a parameterised ,  call _resolveParamRout
                return this.routs.get(method)?.get(path);
        }

        hasTarget(method, path) {
                //TODO : if it's a parameterised ,  call _hasParamTarget
                //TODO : return if either the metod or the path is missing

                if (!this.routs.has(method) || !this.routs.get(method).has(path))
                        return false;
                return true;
        }

        _registerParamRout(method, path, handler) { }

        _resolveParamRout() { }
}
