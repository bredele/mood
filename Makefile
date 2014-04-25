
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

mood.js: components
	@component build --standalone mood --name mood --out .

.PHONY: clean
