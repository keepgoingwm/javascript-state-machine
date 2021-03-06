declare class StateMachine {
	constructor(options: Partial<StateMachine.Options>);
	static factory(options: Partial<StateMachine.Options>): StateMachine.IFSM;
	static factory<T>(instance: T, options: Partial<StateMachine.Options>): StateMachine.IFSM | T;
	[prop: string]: StateMachine.AnyCallBack | string;
	is: StateMachine.StateMachineIs;
	can: StateMachine.StateMachineCan;
	cannot: StateMachine.StateMachineCan;
	transitions: StateMachine.StateMachineTransitions;
	allTransitions: StateMachine.StateMachineTransitions;
	allStates: StateMachine.StateMachineStates;
	observe: StateMachine.Observe;
	// history: string[];
	clearHistory(): void;
	historyBack(): void;
	historyForward(): void;
	canHistory(): boolean;
	canhistoryForward(): boolean;
}

declare namespace StateMachine {
	const VERSION: string; 		        // = "3.x.x"
	const defaults: {
		wildcard: '*',
		init: {
			name: 'init',
			from: 'none'
		}
	};
	// types
	type AnyCallBack = ((...args: any[]) => any);
	type StateMachineIs = (state: string) => boolean;
	type StateMachineCan = (evt: string) => boolean;
	type StateMachineTransitions = () => string[];
	type StateMachineStates = () => string[];
	type Callback = (...args: any[]) => any;

	interface LifeCycle {
		transition: string;
		from: string;
		to: string;
	}

	interface Methods {
		[method: string]: Callback | undefined;
		onBeforeTransition?(lifecycle: LifeCycle, ...args: any[]): boolean | Promise<boolean>;	// 1
		onLeaveState?(lifecycle: LifeCycle, ...args: any[]): boolean | Promise<boolean>;	// 2
		onTransition?(lifecycle: LifeCycle, ...args: any[]): boolean | Promise<boolean>;	// 3
		onEnterState?(lifecycle: LifeCycle, ...args: any[]): any | Promise<any>;	// 4
		onAfterTransition?(lifecycle: LifeCycle, ...args: any[]): any | Promise<any>;	// 5
		onPendingTransition?(transition: string, from: string, to: string): any | Promise<any>;
	}
	interface Observe {
		(event: string, callback: Callback): void;
		(methodOptions: Methods): void;
		[name: string]: Callback;
	}

	interface Options {
		name: string;
		past: string;
		future: string;
		init: string;
		max: number;	// max history
		state: string;
		transitions: {
			name: string;
			from: string | string[] | '*';
			to: string | ((...args: any[]) => string);
		}[];
		methods: Methods;
		data: any;	// {} | any[] | ((...args: any[]) => {} | any[]);
		plugins: any[];
	}

	interface IFSM {
		new(...data: any[]): StateMachine;
	}
}

export = StateMachine;
export as namespace StateMachine;
