import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load() {
	// todo grab scf-token from route, if not there then redirect to page that shows all tenants for them to pick one
	redirect(307, '/E79oLnFioicWGNJ1z93qEujE/issues/map');
}
