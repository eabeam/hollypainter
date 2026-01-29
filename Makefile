.PHONY: help build build-kross build-educenter serve-kross serve-educenter cms audit-links

HUGO ?= hugo

help:
	@echo "Targets:"
	@echo "  build           Build both sites"
	@echo "  build-kross     Build Kross site"
	@echo "  build-educenter Build Educenter site"
	@echo "  serve-kross     Run Hugo server for Kross"
	@echo "  serve-educenter Run Hugo server for Educenter"
	@echo "  cms             Run Decap CMS local backend"
	@echo "  audit-links     Run external link audit"

build: build-kross build-educenter

build-kross:
	$(HUGO) -s site-kross

build-educenter:
	$(HUGO) -s site-educenter

serve-kross:
	$(HUGO) server -s site-kross

serve-educenter:
	$(HUGO) server -s site-educenter

cms:
	npx decap-server

audit-links:
	python3 scripts/audit_links.py
