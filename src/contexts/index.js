import { useContext } from "react";

import {
    default as AccountsContext,
    Provider as AccountsProvider,
} from "./accounts/Context";

import {
    default as AreasContext,
    Provider as AreasProvider,
} from "./areas/Context";

import {
    default as AuthContext,
    Provider as AuthProvider,
} from "./auth/Context";

import {
    default as ConditionsContext,
    Provider as ConditionsProvider,
} from "./conditions/Context";

import {
    default as EmployeesContext,
    Provider as EmployeesProvider,
} from "./employees/Context";

import {
    default as EquipmentsContext,
    Provider as EquipmentsProvider,
} from "./equipments/Context";

import {
    default as EquipTypesContext,
    Provider as EquipTypesProvider,
} from "./equipTypes/Context";

import {
    default as ExtractionsContext,
    Provider as ExtractionsProvider,
} from "./extractions/Context";

import {
    default as LiquidationsContext,
    Provider as LiquidationsProvider,
} from "./liquidations/Context";

import {
    default as PurchasesContext,
    Provider as PurchasesProvider,
} from "./purchases/Context";

import {
    default as RolesContext,
    Provider as RolesProvider,
} from "./roles/Context";

export const useAuth = () => {
    const [state, dispatch] = useContext(AuthContext);
    return [state, dispatch];
};

export const useAccounts = () => {
    const [state, dispatch] = useContext(AccountsContext);
    return [state, dispatch];
};

export const useAreas = () => {
    const [state, dispatch] = useContext(AreasContext);
    return [state, dispatch];
};

export const useConditions = () => {
    const [state, dispatch] = useContext(ConditionsContext);
    return [state, dispatch];
};

export const useEmployees = () => {
    const [state, dispatch] = useContext(EmployeesContext);
    return [state, dispatch];
};

export const useEquipments = () => {
    const [state, dispatch] = useContext(EquipmentsContext);
    return [state, dispatch];
};

export const useEquipTypes = () => {
    const [state, dispatch] = useContext(EquipTypesContext);
    return [state, dispatch];
};

export const useExtractions = () => {
    const [state, dispatch] = useContext(ExtractionsContext);
    return [state, dispatch];
};

export const useLiquidations = () => {
    const [state, dispatch] = useContext(LiquidationsContext);
    return [state, dispatch];
};

export const usePurchases = () => {
    const [state, dispatch] = useContext(PurchasesContext);
    return [state, dispatch];
};

export const useRoles = () => {
    const [state, dispatch] = useContext(RolesContext);
    return [state, dispatch];
};

const StoreProvider = ({ children }) => {
    return (
        <AuthProvider>
            <AccountsProvider>
                <AreasProvider>
                    <ConditionsProvider>
                        <EmployeesProvider>
                            <EquipmentsProvider>
                                <EquipTypesProvider>
                                    <ExtractionsProvider>
                                        <LiquidationsProvider>
                                            <PurchasesProvider>
                                                <RolesProvider>
                                                    {children}
                                                </RolesProvider>
                                            </PurchasesProvider>
                                        </LiquidationsProvider>
                                    </ExtractionsProvider>
                                </EquipTypesProvider>
                            </EquipmentsProvider>
                        </EmployeesProvider>
                    </ConditionsProvider>
                </AreasProvider>
            </AccountsProvider>
        </AuthProvider>
    );
};

export default StoreProvider;
