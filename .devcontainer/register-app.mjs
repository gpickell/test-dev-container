const {
    ARCGIS_APP_ID,
    ARCGIS_PORTAL_URL,
    ARCGIS_DEV_CLIENT_ID,
    ARCGIS_DEV_CLIENT_SECRET,
    VERTIGIS_ACCOUNT_ID,
    FRONTEND_URL
} = process.env;

let token = "";

async function request(url, params) {
    let method = "GET";
    if (params) {
        method = "POST";
    }

    const query = new URLSearchParams({
        f: "json"
    });

    const body = new URLSearchParams(params);
    if (token) {
        body.set("token", token);
        query.set("token", token);
    }

    const res = await fetch(`${ARCGIS_PORTAL_URL}/${url}?${query}`, {
        method,
        body: params ? body : null,
    });

    const json = await res.json();
    if (!res.ok || json.error) {
        const msg = json.error ? JSON.stringify(json.error) : await res.text();
        throw new Error(`${method} ${url} failed: ${msg}`);
    }

    return json;
}

async function authenticate() {
    const { access_token } = await request("sharing/rest/oauth2/token", {
        grant_type: 'client_credentials',
        client_id: ARCGIS_DEV_CLIENT_ID,
        client_secret: ARCGIS_DEV_CLIENT_SECRET,
    });

    token = access_token;
}

async function findApp() {
    return await request(`sharing/rest/oauth2/apps/${ARCGIS_APP_ID}`);
}

function add(values, value, limit) {
    values = new Set(values);
    values.add(value);
    values = [...values];
    return values.slice(0, limit);
}

async function updateApp(urls, url, itemId) {
    urls = add(urls, url, 16);

    return await request(`sharing/rest/oauth2/apps/${ARCGIS_APP_ID}/update`, {
        itemId,
        redirect_uris: JSON.stringify(urls)
    });
}

async function main() {
    await authenticate();

    const { redirect_uris: urls, itemId } = await findApp();
    await updateApp(urls, FRONTEND_URL, itemId);

    const creds = [
        `ARCGIS_APP_ID="${ARCGIS_APP_ID}"`,
        `ARCGIS_DEV_CLIENT_ID="${ARCGIS_DEV_CLIENT_ID}"`,
        `ARCGIS_DEV_CLIENT_SECRET="${ARCGIS_DEV_CLIENT_SECRET}"`,
        `ARCGIS_PORTAL_URL="${ARCGIS_PORTAL_URL}"`,
        `VERTIGIS_ACCOUNT_ID="${VERTIGIS_ACCOUNT_ID}"`,
        `FRONTEND_URL=${FRONTEND_URL}`,
        "",
    ];

    process.stdout.write(creds.join("\n"));
}

main();
