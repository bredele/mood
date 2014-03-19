
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

states.js: components
	@component build --standalone states --name states --out .

.PHONY: clean
