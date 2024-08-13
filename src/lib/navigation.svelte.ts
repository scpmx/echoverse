// import { pushState } from "$app/navigation";

// export type BoardsRoute = {
//   route: "boards";
// };

// export type CatalogRoute = {
//   route: "catalog";
//   ticker: string;
// };

// export type ChatRoute = {
//   route: "chat";
//   ticker: string;
//   id: string;
// };

// export type View =
//   | BoardsRoute
//   | CatalogRoute
//   | ChatRoute;

// class Navigation {
//   current = $state<View>({ route: "boards" });

//   navigate(view: View) {
//     let currentRoute = JSON.stringify(this.current);
//     pushState("", {
//       view: currentRoute,
//     });
//     this.current = view;
//   }
// }

// export let navigation = new Navigation();
