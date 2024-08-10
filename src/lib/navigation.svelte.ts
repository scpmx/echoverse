import { pushState } from "$app/navigation";

type CatalogsRoute = {
  route: "catalogs";
};

type CatalogRoute = {
  route: "catalog";
  ticker: string;
};

type ChatRoute = {
  route: "chat";
  id: string;
};

type View = CatalogsRoute | CatalogRoute | ChatRoute;

class Navigation {
  current = $state<View>({ route: "catalogs" });

  navigate(view: View) {
    let currentRoute = JSON.stringify(this.current);
    pushState("", {
      view: currentRoute,
    });
    this.current = view;
  }
}

export let navigation = new Navigation();
