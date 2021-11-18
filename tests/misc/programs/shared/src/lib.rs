use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod shared {
    use super::*;
    pub fn initialize(_ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn test_vec_mut(ctx: Context<TestVecMut>, filterable: Pubkey) -> ProgramResult {
        for acc in ctx.accounts.data.iter_mut() {
            acc.filterable = filterable;
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct TestVecMut<'info> {
    #[account(mut)]
    pub data: Vec<Account<'info, DataWithFilter>>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct DataWithFilter {
    pub authority: Pubkey,
    pub filterable: Pubkey,
}
