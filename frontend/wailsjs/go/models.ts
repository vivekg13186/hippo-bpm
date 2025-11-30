export namespace models {
	
	export class Account {
	    id: number;
	    title: string;
	    url: string;
	    username: string;
	    password: string;
	    authDomain: string;
	    zenApiKey: string;
	
	    static createFrom(source: any = {}) {
	        return new Account(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.url = source["url"];
	        this.username = source["username"];
	        this.password = source["password"];
	        this.authDomain = source["authDomain"];
	        this.zenApiKey = source["zenApiKey"];
	    }
	}

}

