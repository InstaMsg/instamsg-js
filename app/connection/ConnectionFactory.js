/**
 * Created by gsachan on 30/12/14.
 */

var instamsg = instamsg || {};

instamsg.ConnectionFactory = function (onOpenHandler,onMessageArrived,onCloseHandler,options) 
{
    if (options === null || options === undefined || options.sockjs === undefined || options.sockjsEnabled !== true) 
    {
        return instamsg.SocketConnection.connection(onOpenHandler,onMessageArrived,onCloseHandler,options);
    } 
    else 
    {
        return instamsg.SockjsConnection(onOpenHandler, onMessageArrived, onCloseHandler, options);
    }
}