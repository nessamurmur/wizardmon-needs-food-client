import { WizardmonState } from "../components/wizardmon.tsx";

export const getJSON = (url: string, callback: Function): any => {
  let data = {};
  let req = new XMLHttpRequest();
  req.open("GET", url, true);

  req.onload = () => {
    if (req.status >= 200 && req.status < 400) {
      callback(JSON.parse(req.responseText));
    }
  };

  req.onerror = (error) => {
    console.log(error);
  };

  req.send();
};

export const patchJSON = (url: string, data: WizardmonState, callback: Function): any => {
  let req = new XMLHttpRequest();
  req.open("PATCH", url, true);
  req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  req.onload = () => {
    if (req.status >= 200 && req.status < 400) {
      callback(JSON.parse(req.responseText));
    }
  };

  req.onerror = (error) => {
    console.log(error);
  };

  req.send(JSON.stringify(data));
};
