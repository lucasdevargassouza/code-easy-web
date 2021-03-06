import React from 'react';

import { FlowItem, ItemType } from '../../models/ItemFluxo';
import { Line } from './Line';

interface LinesProps {
    item: FlowItem;
    isUseNewBranch: boolean;
    itensSucessores: FlowItem[];
    onSucessorChange(itemId: string | undefined, sucessorId: string, branchIndex: number | undefined): void;
};
export const Lines: React.FC<LinesProps> = ({ itensSucessores, item, onSucessorChange, isUseNewBranch }) => {
    return <>
        {itensSucessores.map((sucessorItem: FlowItem, index: number) => {

            const left2 = sucessorItem ? sucessorItem.left + sucessorItem.width / 2 : item.left + (item.width / 2);
            const top2 = sucessorItem ? sucessorItem.top - 20/*  + (sucessorItem.height / 2) */ : item.top - 20/*  + (item.height / 2) */;

            if (item.itemType === ItemType.END) return <></>;
            if (item.id === undefined) return <></>; // Se for undefined não cria a linha

            return <Line
                lineType={item.itemType === ItemType.COMMENT ? 'dotted' : 'normal'}
                left1={(item.left || 0) + ((item.width || 0) / 2)}
                top1={(item.top || 0) + (item.height || 0) / 2}
                key={item.id + "_" + sucessorItem.id}
                onSucessorChange={onSucessorChange}
                sucessorIndex={index}
                color={"gray"}
                left2={left2}
                id={item.id}
                top2={top2}
            />;

        })}

        {/* Usado para adicionar uma branch caso o item não tenha sucessores ainda, ou tenha bugado */}
        {(isUseNewBranch && item.id !== undefined) &&
            <Line
                left1={(item.left || 0) + ((item.width || 0) / 2)}
                top1={(item.top || 0) + (item.height || 0) / 2}
                color="var(--toolbar-item-background-active)"
                left2={item.left + (item.width / 2)}
                top2={item.top + (item.height + 20)}
                onSucessorChange={onSucessorChange}
                key={item.id}
                id={item.id}
            />
        }

    </>
};
