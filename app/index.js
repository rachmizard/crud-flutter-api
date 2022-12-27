import server from "./server";
import { initializeDB } from "./utils/database";

(async () => {
	await initializeDB();
	server.listen(process.env.PORT, () => {
		console.log("Listening on 4000 PORT");
	});
})();
