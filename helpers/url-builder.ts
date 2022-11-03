export class UrlBuilder {
  private _namespace: string;
  private _url: string;
  private _searchParams: URLSearchParams;

  constructor(namespace: string = "") {
    this._namespace = namespace;
    this._url = "";
    this._searchParams = new URLSearchParams();
  }

  setUrl(url: string): this {
    this._url = url;
    return this;
  }

  addSearchParam(param: string, value?: string | number | boolean): this {
    if (!value) {
      this._searchParams.delete(param);
      return this;
    }

    if (typeof value === "boolean" && value) {
      this._searchParams.set(param, "true");
      return this;
    }

    this._searchParams.set(param, String(value));
    return this;
  }

  toString(): string {
    if (this._searchParams.toString().length === 0) {
      return `${this._namespace}${this._url}`;
    }

    return `${this._namespace}${this._url}?${this._searchParams.toString()}`;
  }
}
