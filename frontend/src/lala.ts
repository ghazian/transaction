type TransformationFn<TIn, TOut> = (item: TIn) => TOut;

type ListAdditionProps<TIn, TOut> = {
	list: TIn[];
	transformationFn: TransformationFn<TIn, TOut>;
};

const increment: TransformationFn<number, number> = (num) => num + 1;

const listAddition = <TIn, TOut>({
	list,
	transformationFn,
}: ListAdditionProps<TIn, TOut>): TOut[] => {
	return list.map(transformationFn);
};

listAddition({
	list: [1, 2],
	transformationFn: increment,
});
