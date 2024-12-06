
import { useAuthUser } from '../../context/authContext';
import { useInventory } from '../../context/InventoryContext';
import { InventoryItem } from './InventoryItem';
import { InventoryItemAdd } from './InventoryItemAdd';

export const InventoryList = () => {
	// Obtener el estado y funciones necesarias desde el contexto
	const { filteringInventory } = useInventory();
	const {hasAdminRole} = useAuthUser();


	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{
			filteringInventory.map((product) => (
				<InventoryItem
					product={product}
				/>
			))
		}
		{hasAdminRole() && <InventoryItemAdd />}
		</div>
  );
};
