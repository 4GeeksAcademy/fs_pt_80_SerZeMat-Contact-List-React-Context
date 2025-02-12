const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			url: "https://playground.4geeks.com/contact/",
			selected: null,
			contacts: null,
		},
		actions: {

			setSelected: (contact) => setStore({ selected: contact }),

			createAgenda: async () => {
				try {
					const response = await fetch(getStore().url + "agendas/sergio-cecilia",
						{
							method: "POST",
						});
					if (!response.ok) throw new Error("Error mientras se crea la agenda:");
					await response.json();
					getActions().getContact();
					return true;
				} catch (error) {
					console.error("Error al crear los agenda:", error);
				}
			},

			getContactById: (id) => {
				const store = getStore();
				return store.contacts.find(contact => contact.id === parseInt(id)) || null;
			},

			getContact: async () => {
				try {
					const response = await fetch(getStore().url + "agendas/sergio-cecilia");
					if (response.status === 404) return getActions().createAgenda();
					if (!response.ok) throw new Error("Error mientras se obtiene la agenda");
					const data = await response.json();

					setStore({ contacts: data.contacts || [] });
				} catch (error) {
					console.error("Error al cargar los contactos:", error);
				}
			},

			updateContact: async (id, contact) => {
				try {
					const response = await fetch(
						getStore().url + "agendas/sergio-cecilia/contacts/" + id,
						{
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(contact),
						}
					);
					if (!response.ok) throw new Error("Error al modificar el contacto");
					await response.json();
					getActions().getContact();
					setStore({ selected: null });
				} catch (error) {
					console.error(error);
				}
			},

			createContact: async (contact) => {
				try {
					const response = await fetch(getStore().url + "agendas/sergio-cecilia/contacts",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(contact),
						});
					if (!response.ok) throw new Error("Error al agregar el contacto");
					await response.json();
					getActions().getContact();
				} catch (error) {
					console.error("Error al enviar el contacto:", error);
				}
			},

			deleteContact: async (id) => {
				try {
					const response = await fetch(getStore().url + "agendas/sergio-cecilia/contacts/" + id, {
						method: "DELETE"
					});
					if (response.ok) {
						getActions().getContact();
						setStore({ selected: null });
					} else {
						console.error("Error al eliminar el contacto");
					}
				} catch (error) {
					console.error("Error en la eliminación:", error);
				}
			}
		}
	};
};

export default getState;
