// хелпер предназначен для того чтобы получать доступ к .env переменным в клиентском коде
// вне зависмости от того вебпак обслуживает проект или вит
// что полезно для пакетов вроде base или ui-kit, которые подключаются в crm, link, auth и других проектах
const PREFIX_ENV = 'VITE_';

function removePrefixFromEnvKeys({ ...env }) {
    return Object.keys(env).reduce((acc, key) => {
        if (key.startsWith(PREFIX_ENV)) {
            const newKey = key.replace(PREFIX_ENV, '');
            acc[newKey] = env[key];
        } else {
            acc[key] = env[key];
        }
        return acc;
    }, {});
}
function getBundlerAgnosticEnv() {
    let BUNDLER_AGNOSTIC_ENV = {};
    if (typeof process !== 'undefined') {
        BUNDLER_AGNOSTIC_ENV = { ...process.env };
    } else {
        BUNDLER_AGNOSTIC_ENV = removePrefixFromEnvKeys(import.meta.env);
    }
    return BUNDLER_AGNOSTIC_ENV;
}

const BUNDLER_AGNOSTIC_ENV = getBundlerAgnosticEnv();

export { BUNDLER_AGNOSTIC_ENV };
export default getBundlerAgnosticEnv();
