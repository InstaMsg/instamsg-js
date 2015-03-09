/**
 * Created by gsachan on 29/12/14.
 */

var instamsg = instamsg || {};
instamsg.Result = instamsg.Result || {}
instamsg.Result.init = function (result, succeeded) {

    var self = this;
    var Result = result;
    var Succeeded = succeeded;

        instamsg.Result.cause = function () {
            return !succeeded ? result : null;
    };

        instamsg.Result.failed = function () {
            return !succeeded ? true : false;
    };

        instamsg.Result.succeeded = function() {
            return succeeded ? true : false;
    };

        instamsg.Result.result = function() {
            return succeeded ? result : null;
    };
    return instamsg.Result;
}