class Result {
    constructor(data, msg, states) {
        this.data = data
        this.msg = msg
        this.states = states
    }

    static success(data) {
        return new Result(data || {}, "成功", 0)
    }

    static fail(msg) {
        return new Result({}, msg || '失败', 1);
    }
}

console.dir(Result.success());
console.dir(Result.fail());