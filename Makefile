.PHONY: help build serve cms audit-links

HUGO ?= hugo

help:
	@echo "Targets:"
	@echo "  build           Build site"
	@echo "  serve           Run Hugo dev server"
	@echo "  cms             Run Decap CMS local backend"
	@echo "  audit-links     Run external link audit"

build:
	$(HUGO) -s site-educenter --gc --minify

serve:
	$(HUGO) server -s site-educenter

cms:
	npx decap-server

audit-links:
	python3 scripts/audit_links.py
