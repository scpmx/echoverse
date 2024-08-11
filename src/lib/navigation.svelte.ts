import { pushState } from "$app/navigation";

type Boards = {
  route: "boards";
};

type Catalog = {
  route: "catalog";
  ticker: string;
};

type Chat = {
  route: "chat";
  id: string;
};

type View = Boards | Catalog | Chat;

class Navigation {
  current = $state<View>({ route: "boards" });

  navigate(view: View) {
    let currentRoute = JSON.stringify(this.current);
    pushState("", {
      view: currentRoute,
    });
    this.current = view;
  }
}

export let navigation = new Navigation();
