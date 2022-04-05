import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { createScopedKeydownHandler } from '@mantine/utils';
import { UnstyledButton } from '../../Button';
import { useTabsContext } from '../Tabs.context';
import useStyles from './Tab.styles';

export interface TabProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
  value: string;
  children: React.ReactNode;
}

export function Tab({ value, children, onKeyDown, onClick, ...others }: TabProps) {
  const { theme } = useStyles();
  const ctx = useTabsContext();
  const isActive = value === ctx.value;
  const activateTab = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ctx.onTabChange(ctx.allowTabDeactivation ? (value === ctx.value ? null : value) : value);
    onClick?.(event);
  };

  return (
    <UnstyledButton<'button'>
      type="button"
      role="tab"
      id={ctx.getTabId(value)}
      aria-selected={isActive}
      tabIndex={isActive || ctx.value === null ? 0 : -1}
      aria-controls={ctx.getPanelId(value)}
      onClick={activateTab}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: ctx.activateTabWithKeyboardEvents,
        loop: ctx.loop,
        dir: theme.dir,
        orientation: ctx.orientation,
        onKeyDown,
      })}
      {...others}
    >
      {children}
    </UnstyledButton>
  );
}

Tab.displayName = '@mantine/core/Tab';