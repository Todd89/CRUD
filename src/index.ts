import http from "http";
import url from "url"
import { greeting } from "./commands/greeting";
import 'dotenv/config'

export const startCRUD = () => {
  let DATA = [];
  greeting ();
  http.createServer(async function (request, response){
    let userId = "";
    if(request.url) {
      if(request.url.split('/').length === 4) {
        userId = request.url.split('/')[3]
      }
    }
    if(request.url === process.env.URL_USERS as string && request.method === "GET"){
      response.statusCode = 200;
      response.end(DATA.toString());
  }
    // GET BY ID
    if(request.url === `/api/users/${userId}` && request.method === "GET"){
      const user = DATA.find(el => JSON.parse(el).id === userId)
      if(!user) {
        response.statusCode = 404;
        response.end("Данные неверны");
      } 
      response.end(user);  
  }
    // POST

    if(request.url === "/api/users" && request.method === "POST"){
      if(+(request as any).headers["content-length"] > 0) {
        for await (const chunk of request) {
          let newUser = JSON.parse(chunk);
          const newUserInfo = Object.keys(newUser);
          const trueInfo = newUserInfo.filter(el => el === "id" || el === "userName");
          if(trueInfo.length === 2) {
            DATA.push(chunk as never); 
          } else {
            response.statusCode = 400;
            response.end("Данные неверны");
          }
                
      }
          response.statusCode = 201;
          response.end("Данные успешно отправлены");
      } else {
        response.statusCode = 400;
        response.end("Данные неверны");
      }
  }
 
    // console.log("Url: " + request.url);
    // console.log("Тип запроса: " + request.method);
    // console.log("User-Agent: " + request.headers["user-agent"]);
    // console.log("Все заголовки");
    // console.log(request.headers);
    // response.setHeader("UserId", 12);
    // response.setHeader("Content-Type", "text/html; charset=utf-8;");
    // response.write("<h2>hello world</h2>");
    // await response.end("The end");
}).listen(3000, function(){
  console.log("Server started at 3000");
});
}

startCRUD();