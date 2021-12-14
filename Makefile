lint:
	npx eslint .

setup:
	yarn install --frozen-lockfile

lint-fix:
	npx eslint --fix .

test:
	yarn run test
